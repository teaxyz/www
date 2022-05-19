import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as cloudfrontOrigins from "@aws-cdk/aws-cloudfront-origins";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deployment from "@aws-cdk/aws-s3-deployment";
import * as cdk from "@aws-cdk/core";

/**
 * The CloudFormation stack holding all our resources
 */
export default class TeaXYZ extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * The S3 Bucket hosting our build
     */
    const bucket = new s3.Bucket(this, "Bucket", {
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    /**
     * The CloudFront distribution caching and proxying our requests to our bucket
     */
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new cloudfrontOrigins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
    });

    /**
     * Output the distribution's url so we can pass it to external systems
     */
    new cdk.CfnOutput(this, "DeploymentUrl", {
      value: "https://" + distribution.distributionDomainName
    });

    /**
     * Upload our build to the bucket and invalidate the distribution's cache
     */
    new s3Deployment.BucketDeployment(this, "BucketDeployment", {
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/", "/index.html"],
      sources: [s3Deployment.Source.asset('./website')],
    });
  }
}