import React from 'react';
import SuggestionScreen from './components/suggestionScreen';
import Questionnaire from './components/questionnaire';
import Homepage from './components/homepage.js';


import {createStackNavigator, createAppContainer} from 'react-navigation';

const MainNavigator = createStackNavigator({
    Homepage : {screen: Homepage},
    Questionnaire : {screen: Questionnaire},
    SuggestionScreen: {screen: SuggestionScreen}
});

const App = createAppContainer(MainNavigator);



export default App;
