On Databases: One way of looking at our choice could be whether we want to prioritize more "static" features (Statistics, data storage, etc.) which would be best served with a strict relational SQL database, or focus on more "dynamic" features, namely those that will require fairly frequent querying of data from the database (such as a live in-browser Rock Paper Scissors tournament app might require). On the topic of tournament brackets, specifically, it would be much easier to represent tournament brackets as a serialized JSON (eg{ round1: [ match1, match2], round2: [match1, match2], round3: [match1]}) than as a single row in a relational table, especially if the brackets can be of variable size. However, there is still something to be said for maintaining strict relational data control for the rest of our data, meaning we could explore some kind of two database solution, storing things like user data and stats with Sequelize and using Mongoose to handle things like react state, with middleware and functions as needed to prepare data before serving. Perhaps the final decision for this will come down to whoever really wants to handle the database(s), and which stack(s) they feel most comfortable with, as we can come up with solutions using either technology.





On Real-Time React App: I had hoped React would come with some easy, built in ways to listen for state updates from a server and implement them in real time as needed. Unfortunately, most implementations of real-time behavior I've come across require some kind of use of websockets or socket.io in addition to the standard React library. There does also seem to be an npm package promising some real-time components (https://www.npmjs.com/package/react-realtime) but regardless, implementing something like our MVP (A live in-browser rock-paper-scissors tournament with real-time updates as matches finish and players advance or are eliminated) is going to require external libraries. Personally, since I have some experience with sockets, this doesn't seem anything more than a temporary road block that's well worth surmounting, but it does make our MVP much more complicated than I had thought, so worth thinking about.

Sharon Story Smith 2:47 PM
Chris has experience with authorization and I'd like to help because I have no knowledge of that implementation.   Thomas,  I look forward to  your diagrams; I'd like to put together th group presentation of our project using MS PowerPoint - in doing so I'd like to document each project's tasks and it's design.       On database  maybe these facts will make our decision  clearer- Relational Databases feature: no redundancy of data in tables and data integrity (  a data item only stored in one location), n# of relationships with few indices to maintain and other relationships created spontaneously, some security provided since we can exclude data from "views" and only access the data that's germain to our app and thus effect performance in the fetch cycle (although I doubt our demo wil push the limits of a "large database" and thus cause performance of the nonSQL to suffer.) Negligible difference in salaries of MySQL DBA and Mongo DBA.

        (N)
    /      \
(2N +1) (2N + 2)

I was adding these fields to the object for tourney:
{
    "players": [ // Basic array of objects for tournament bracket. Will be built with appropriate# of objects based on tournament size.
        {
            "userID": "", // This userID will be passed the userID# from users Table/JSON 
            "initialSeed": "",
            "currentSeed": "",
            "lastOutcome": false, // true for win false for loss. Default to loss to start.
            "currentGame": "" // game# determined by binary tree id
        }
    ]
}
The the user json would be something like this under the assumption that the tourney bracket json would reference the user json via the userid "key":
{
    "users": [
        {
            "userID": "", //UserID# given from Auth0
            "screenName": "", //To show onscreen
            "matchesPlayed": "",
            "matchesWon": "",
            "tourneysWon": ""
        }
    ]
}

Nothiby tangible to report so far, been looking into "hydration" which really seems to be referring to rendering React components on the server, then sending these components fully rendered to the client, where the react client can then take it from there. While this seems like a definite possibility to allow game "plugins", it seems mainly people use this workflow to optimize performance and search engine results, and it has the potential of opening up a whole can of worms vis-a-vis customising the webpack configuration and compiling JSX server side, definitely a step up in complexity from how we've worked with React so far.
I'm going to keep looking into it, but I'm more interested in trying to see how other React projects handle concepts like "plugins" or "mods" on the client end, other than just storing all the code inside the react client.