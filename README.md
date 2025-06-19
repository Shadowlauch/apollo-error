In the following circumstances, the query will stop being updated from other places in the cache:

- Have a state used as a variable in the query and in the skip condition. The skip condition should be false at first render
- The state gets set to a value that will turn the skip condition true. (Probably while the first request is still in flight)
- The state gets set to the initial value we had at first render

Now if a mutation, for example, gets an updated version of one of the items in the query, the query will not be updated.

To reproduce this error with this repo:

1. Clone the repo
2. Run `npm install`
3. Run `npm start:server`
4. Run `npm start`
5. Open the browser and go to `http://localhost:3000`
6. Wait for the initial data to load
7. Click on "Edit first person"
8. If everything was working correctly, it should update the first person in the list to the name in the input field, but it will not.
