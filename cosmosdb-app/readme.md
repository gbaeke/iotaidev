Cosmos DB App

**Web app**

Simple HTML page that displays a list of tweets; the tweets are stored in Cosmos DB.

The web page uses ADAL to obtain an authentication token to authenticate to the API.

**API**

Simple API in Azure Functions. API call is https://fniotaidev.azurewebsites.net/api/tweet/get/Geert%20Baeke

Function App is fniotaidev.

The function app is secured with Azure AD authentication. You can only call it with token obtained via ADAL.