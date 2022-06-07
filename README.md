# tea/www

Deploys to [tea.xyz](https://tea.xyz).

# Conditions of Use

This repo is open source, but you may not publish this website in an attempt
to masquerade as tea.inc. Trademark law has our back here.

# Getting Started

```sh
sh <(curl tea.xyz) https://github.com/teaxyz/www
```

Alternatively:

```sh
npx watch-http-server . -p8000 -o -a localhost
open localhost:8000
```

# Dependencies

| Project    | Version |
|------------|---------|
| nodejs.org |   ^18   |
|------------|---------|
| gohugo.io  | v0.99.1 |
|------------|---------|
| bootstrap  |    v5   |
|------------|---------|
| jquery     |  3.6.0  |


# Editing/Syntax

This site is has been built with the help of [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/) for CSS/JS heavy-lifting and [HUGO](https://gohugo.io/documentation/) for templating and DRY development. HUGO must be installed locally in order to adequately preview development via terminal command [hugo server]. Partials/repeated components can be be found in layouts/partials. Each HTML page (layouts/page) must have a corresponding Markdown file in the Content folder (content/).

#Creating a New Page

1) Create a new HTML file in layouts/page

2) Define the content section via {{ define "main" }} prior to proposed content area, and {{ end }} after proposed content area. User this HTML file to affect layout and styling. Content may be added via the corresponding .md file (see step 3)

3) Create a .md file in the 'Content' folder and provide the appropriate metadata. Example:

title: "White Paper" (How this page will appear in the menu)
Description: "tea.white paper" (Populates as page title)
layout: "white-paper" (the associated HTML file)
menu: main (Assign a menu)
weight: 7 (Order in which this item will appear)

Following that, begin typing content. This will populate in the section of your HTML document that has been defined as "main".

4) If adding a menu link for an external source or ID, edit the config.toml accordingly.

#Editing Partials/Repeated components

Partials may be edited in plain HTML. No additional HUGO syntax is required.

#Defining Partial Locations

Partials are defined via the 'baseof.html' file in layouts/default. This informs the layout of a newly generated page. Insert new partials via the syntax {{- partial "partial.html" -}}.
