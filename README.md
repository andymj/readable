This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Folder Structure

```
  my-app/
	README.md
	node_modules/
	package.json
	public/
	  index.html
	  favicon.ico
	src/
	  actions/
		index.js
	  components/
		App.js
		Post.js
		Posts.js
		Sidenav.js
	  reducers/
		index.js
	  App.css
	  App.test.js
	  index.css
	  index.js
```

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.
* `src/actions/index.js` has all the actions needed by the store
* `src/component` has all the Components used for this project.
* `src/reduces/index.js` has all the reducers that the store needs to update it's state.

Only files inside `public` can be used from `public/index.html`.<br>

## Available Scripts

In the project directory, run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Project Back End Dependecy
This project needs the back end to be running in order to work, otherwise it won't work.<br>
see [back end link](https://github.com/udacity/reactnd-project-readable-starter)