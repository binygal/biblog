---
title: Hello World
date: "2020-04-13"
description: "My first blog post or how did I ran Gatsby on my Mac"
---

I wanted to have my blog for many years. I have so many small things that I learned by the time going that I wanted to
share with the world, and it will be nice knowing how much my writings are helping fellow developers.

But I was worried that I have nothing useful to share. All my problems seems to be unique or trivial. I never designed a
library nor did I build a very complex solution so I kept talking about architecture,
interesting debugging and new technology that I've used in the office kitchen with some people that liked it
and some people who were just polite enough to listen (I appreciate your patience, Jon the recruiter :) )

About a week ago I finally had time to watch Scaling Yourself, a great talk by Scott Hanselman and I realized it is the time
to start a blog.

[![Scaling yourself](https://img.youtube.com/vi/V4NJo2Mfvrc/0.jpg)](https://www.youtube.com/watch?v=V4NJo2Mfvrc)

### Off we go

For getting started, I needed to decide about the technology I will use for my blog.
After watching [Harry Wolff's comparison between Gatsby and Next.js](https://www.youtube.com/watch?v=imeAhvbA968)
I went with Gatsby. Installing `gatsby-cli` was easy, as well as starting the blog-starter template.
But when trying to run the code I got this ugly message where libvips has failed to build -

```cli

npm ERR! sharp@0.25.1 install: (node install/libvips && node install/dll-copy && prebuild-install --runtime=napi) || (node-gyp rebuild && node install/dll-copy)
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the sharp@0.25.1 install script '(node install/libvips && node install/dll-copy && prebuild-install --runtime=napi) || (node-gyp rebuild && node install/dll-copy)'.
npm ERR! This is most likely a problem with the sharp package,
npm ERR! not with npm itself.
npm ERR! Tell the author that this fails on your system:
npm ERR! (node install/libvips && node install/dll-copy && prebuild-install --runtime=napi) || (node-gyp rebuild && node install/dll-copy)
npm ERR! You can get information on how to open an issue for this project with:
npm ERR! npm bugs sharp
npm ERR! Or if that isn't available, you can get their info via:
npm ERR!
npm ERR! npm owner ls sharp
npm ERR! There is likely additional logging output above.

```

Looking for this error didn't get a lot of results. Seems like the only place that gave some data was [this github issue](https://github.com/lovell/sharp/issues/2128) and it wasn't really helpful as the title talks about building on MacOS but the solution is for linux :/

Digging into the log gave me this clue - `TypeError: cannot use a string pattern on a bytes-like object` Something weird is going on with the way `node-gyp` is executing the libvips files. While [this comment](https://github.com/libxmljs/libxmljs/issues/469#issuecomment-309605567) suggests that the problem is with Python, it really was the clue that the problem lays in node-gyp. Now I need to upgrade node-gyp to see if that issue is still happening. Here is the place where I needed to use `npm explore`.

### npm explore

npm explore is your way to run a command inside a folder of npm package. For example - running `npm explore foo -- ls`
will run the `ls` command inside your `foo` dependency folder.
To update the node-gyp package that npm is using, I need to update node-gyp inside the npm global install folder.
In our case the command will be:

```
npm explore npm -g -- npm install node-gyp@latest
```

And... viola, the node-gyp is updated and my blog is up and running. Ok. not up and running yet,
I still need to write my first blog post so I have something in that blog. I think I have an idea...

====

I hope you've enjoyed this post. You're more than welcome to drop a message on Twitter and let me know what is good and what is bad about this post.
