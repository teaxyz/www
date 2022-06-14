import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as cloudfrontOrigins from "@aws-cdk/aws-cloudfront-origins";
import * as s3 from "@aws-cdk/aws-s3";
import * as lambda from "@aws-cdk/aws-lambda";
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

    const edgeLambda = lambda.Version.fromVersionArn(this, "Lambda", "arn:aws:lambda:us-east-1:640264234305:function:www-redirect:10");

    /**
     * The CloudFront distribution caching and proxying our requests to our bucket
     */
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: new cloudfrontOrigins.S3Origin(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [
          {
            eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
            functionVersion: edgeLambda,
          },
        ],
      },
      defaultRootObject: "index.html",
      errorResponses: [
        {
          httpStatus: 403,
          responsePagePath: "/404.html"
        },
      ],
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
      distributionPaths: ["/*"],
      sources: [s3Deployment.Source.asset('../public')],
    });
  }
}