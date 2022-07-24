![tea](https://tea.xyz/banner.png)

Deploys to [tea.xyz].


# Legal

You may not publish this website in an attempt to masquerade as tea.inc.
The tea logo and wordmark are registered trademarks of tea.inc.


# Contributing

* The site is built with [Hugo] and [Bootstrap].
* `.html` files in [`./src/layouts/page/`] have a corresponding `.md` file in [`./src/content/`].
* Repeated components are in [`./src/layouts/partials/`].

## Getting Started

hugo can render your edits while you work:

```sh
hugo serve --watch --buildDrafts --source src
```

## Dependencies

Install hugo yourself or use tea: `sh <(curl tea.xyz) hugo`.

| Project    | Version |
|------------|---------|
| gohugo.io  |  >=0.99 |


# Build

Builds a static, deployable version of the website.

```sh
hugo --source src --destination ../public --minify
```


[tea.xyz]: https://tea.xyz
[Bootstrap]: https://getbootstrap.com/docs/5.2/getting-started/introduction/
[Hugo]: https://gohugo.io/documentation/
[`./src/layouts/page/`]: src/layouts/page
[`./src/content/`]: src/content
[`./src/layouts/partials/`]: src/layouts/partials
