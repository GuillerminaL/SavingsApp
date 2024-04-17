# Savings App

An app to keep track of personal savings. The aim is to consolidate all the savings that the user could have in different currencies and be able to know the total amount of money in an specific currency. 

Additionally a saving can have different shapes, e.g. euros on different bank accounts, physical tenance, etc. 

## Screenshots

### Sign In with Google

Provides access to app features by registering or login in with a Google Account.

![Google Sign In](documentation/GoogleSignIn.png "Google Sign In")

### Home

Shows a grid with all the personal savings, allowing to filter by tag and currency.

![Home view](documentation/HomePage.png "Home View")

### Currencies Page

Shows a list of available currencies

![Currencies view](documentation/CurrenciesPage.png "Currencies View")

### Savings Page

Shows a list of current savings

![Savings view](documentation/SavingsPage.png "Savings view")

#### Adding a new saving

Allows to add a new saving in a specific currency and tag.

![Add saving](documentation/OnNewSaving.png "Add saving")

#### Adding a new movement

Allows to make a new addition or sustraction movement to a saving.

![Add movement](documentation/OnAddSavingMovement.png "Add movement")


#### Showing a saving movements list

Allows to see a detailed list of movements with pagination

##### Scenario 1: A saving has movements

![Show movements](documentation/OnShowSavingMovementsList.png "Show movements")

##### Scenario 2: A saving has no related movements

![Show no movements yet](documentation/OnShowSavingMovementsEmptyList.png "Show movements when no movements yet")

##### Scenario 3: Internal error handler

![Show movements error](documentation/OnShowSavingMovementsErrorHandler.png "Show movements error")

### Tags Page

Shows a list of current tags

![Tags view](documentation/TagsPage.png "Tags View")

#### Adding a new tag

Allows to add a new tag.

![Add tag](documentation/OnNewTag.png "Add Tag")

Showing required fields error

![Add tag](documentation/OnAddTagRequiredFieldsError.png "Add Tag Error")

#### Editing a tag name and/or description

![Edit tag](documentation/OnEditTag.png "Edit Tag")

#### Removing a tag

![Remove saving](documentation/OnRemoveTag.png "Remove Tag")


### Current work
- Google login

### Future work
- Filtering
- Currency converter
- Currency reports