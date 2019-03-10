# Noteshelf Client

Front end client for the noteshelf application. The app is built with Angular 7 and it communicates with the noteshelf rest service to process the requests.

The app is divided into three modules viz. User, Notes and profile.

User module contains the components responsible for user login, user registration, forgot password, verify registration email etc.

Notes module contains components responsible for maintaining the notes of the user. It has notes- collection component which acts a container for all the notes. The note component holds the details of an individual note such as title, content, last updated date. The note create/edit component provides a rich text editor to create new notes or update existing notes.

Profile module contains the profile component which is responsible for maintaining the profile of the user. The user can update his personal information including profile pictureand interests via this component.

Noteshelf contains animations for smooth transition from one component to another giving better user experience. Where ever possible resolvers are used to fetch the data required by the component before the component is loaded. Also angular guards are used prevent user from accidentally deleting an unsaved note.

The Noteshelf angular client application is deployed on firebase from where it communicates with the backend application hosted on AWS.