# The Daily Lens

The Daily Lens is a React-based web application that provides users with the latest news from around the world. The app utilizes the CURRENTS API (https://currentsapi.services/en) to gather news articles. The key features of the app include advanced filtering options, allowing users to search via keywords or categories as well as selecting their language preference. This solves the problem of having to go to multiple different news outlets to find news, some of which are skewed towards local news or presents biases on certain topics. 

## Features

- **Search by Keyword**: Users can enter a keyword to fetch relevant news articles.
- **Search by Category**: Users can select a category to view news articles related to that category.
- **Language Selection**: Users can choose the language of the news articles from multiple options.
- **Responsive Design**: The application is designed to be mobile-friendly and responsive.

## Getting Started

To run this application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yz9753/The-Daily-Lense.git
   cd The-Daily-Lense

2. **Install dependencies**:
    ```bash
    npm install

3. **Set up your API key**:
   
Create a .env file in the root of your project and add the Currents API key (provided in the lytespace submission) 
    ```bash
    REACT_APP_CURRENTS_API_KEY=your_api_key_here


5. **Run the application**:

   ```bash
   npm start


6. **If it didn't start, open your browser and go to http://localhost:3000.**


## LLM Assistance 

In building this application, I utilized a large language model (LLM) to assist in desinging the website with css. It also helped me to debug when I was having difficulty updating the category instantly when the user selects the specific category in which I added two React hooks useEffect and useCallback. 

## How to Use

1.	Select search by keyword or category in the dropdown 
2.	If searching by keyword, enter your desired keyword in the input field and click the “Search” button.
3.	If searching by category, click on one of the category buttons to fetch relevant articles.
4.	Optionally, select the desired language from the dropdown menu to filter news articles.
