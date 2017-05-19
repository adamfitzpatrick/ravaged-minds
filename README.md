# Ravaged Minds

<!--- bit --->
_Ravaged Minds_ is a single-player adventure model intended for use with Dungeons & Dragons 5th Edition.
Please note that this module is a work in progress.  Several components are designed to allow for smooth
adventure management:

- A graphical story guide, allowing the DM to guide the player through the adventure while keeping track
of the various story paths available
- Linked maps that can be explored from the overall world down to detailed encouter level
- Detailed story point views with links to maps, NPCs and potentential enemies.
- A combat tracker
- The ability to show or hide information to a logged-in player based on the story path the player has
followed and the information that has been uncovered or must remain hidden.

The module is written in typescript and utilizes AngularJS.  It is served up by an integrated NodeJs
express application and incorporates very simple authentication.  Notes and adventure progress are
maintained in a Mongo database.
<!--- /bit --->

For story, images and yaml files in `story-assets` directory can be modified, including the favicon.
