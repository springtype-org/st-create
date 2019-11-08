## `st-create`: The missing TypeScript project scaffolder

> Generates whole TypeScript projects, but also specific components based on simple templates.

`st-create` tries to help you to don't repeat yourself so much and sets up all kinds of projects in no time.

<img src="bringiton.png" width="250">

Many projects and components share the same basic code structure. e.g. single page website, multi-page websites, landing pages, Ionic PWA' or components.

In the context of the framework they're based on,  (SpringType, Bootstrap, React etc.) they get  generated on basis of templates to save time.

<h2 align="center">Setup</h2>


    yarn global add st-create


<h2 align="center">How to use?</h2>

Just run:

    st-create

`st-create` will generate it's result relative to the current folder.

<img src="howto.png" height="300" />

The following command prints all options:

    st-create -h

<img src="usage.png" height="250" />

<h2 align="center">Automation</h2>

Instead of the interactive CLI questionair, you can also name all agruments and directly generate results:

    st-create -c project -t babylon-3d -n MyNewWebGLGame

<h2 align="center">Custom templates</h2>

You can just name a template folder to create a new project/component from:

    st-create -c project -t ../templates/my-blog-template -n AronsBlog


<h2 align="center">Short-term Roadmap</h2>

We're keen to improve this implementation until we feel really comfortable with it. Right now this lacks:

- [ ] e2e tests
- [ ] Unit tests
- [ ] The ability to directly fetch templates from GitHub repository URL's

<h2 align="center">Maintainers</h2>

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/454817?v=4&s=150">
        </br>
        <a href="https://github.com/kyr0">Aron Homberg</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/12079044?s=150&v=4">
        </br>
        <a href="https://github.com/mansi1">Michael Mannseicher</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Contributing</h2>

Please help out to make this project even better and see your name added to the list of our  
[CONTRIBUTORS.md](./CONTRIBUTORS.md) :tada: