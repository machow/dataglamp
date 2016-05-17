[DataGlamp, a web experiment in luxurious SCT creation][gh-page]
================================================================

What?
------

[Datacamp](https://datacamp.com) is a site that offers interactive R and Python tutorials.
One of their coolest features is the ability to create your own interactive exercises
[with Github and simple markup](dc-create).
In brief, creating an exercise requires a couple pieces:

* sample-code: what the student sees.
* solution: what s/he should produce from the sample-code.
* sct: submission-correctness tests to verify they produced the proper solution.

Normally when writing exercises you write these pieces in Rstudio with Rmarkdown, 
push them to github, pray they work, and (maybe) cry when they don't.

Dry your eyes. [Dataglamp][gh-page] is a no-tears web experiment in making it easy to 
read, write, and run exercises.

Compare, 

<img src="https://machow.github.io/dataglamp/content/img/dg-tour.gif" style="max-height: 400px;">

With,

<img src="https://machow.github.io/dataglamp/content/img/r-tour.gif" style="max-height: 400px;">

[Check it out here][gh-page]

[Here's a video testing an exercise and updating an SCT](https://v.usetapes.com/kcb7DjPxhl)

Building
--------

dataglamp requires `node`, and (currently) these packages installed globally:

* [browserify](http://browserify.org/)
* [uglifyify](https://github.com/hughsk/uglifyify)
* [watchify](https://github.com/substack/watchify)

e.g. `npm i -g browserify uglifyify watchify`

note that dataglamp harnesses the power of [datacamp-light](https://github.com/datacamp/datacamp-light)
to preview exercises.

[gh-page]: http://machow.github.io/dataglamp/
[dc-create]: https://www.datacamp.com/teach/documentation

Disclaimer
----------

I built this in order to test what it would be like to write exercises via a dashboard.
It's pretty convenient, but the usual 
built-an-experimental-web-app-on-top-of-a-third-party-api caveats apply.
Don't plan on relying on it for anything, except to indulge your curiousity.
