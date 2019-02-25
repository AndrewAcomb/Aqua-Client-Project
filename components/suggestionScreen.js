import React from 'react';
import {StyleSheet, Text, View, ScrollView, Button, WebView, TouchableWithoutFeedback} from 'react-native';
import SuggestedItem from './suggestedItem';
import Suggestions from '../suggestions.json';

export default class SuggestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            categories: [],
            blogVisible: false,
            blogLink: null
        }
    }

    componentDidMount = () => {
        const {state} = this.props.navigation;
        const suggestions = this.retrieveSuggestions(state.params.categories);
        suggestions.forEach(a => a.selected = false)
        this.setState({suggestions: suggestions, categories: state.params.categories, blogVisible: false})
    }

    retrieveSuggestions(categories) {
        let foundAttractions = Suggestions.Locations[1].Attractions.filter(a => {
                let intersection = a.Categories.filter(x => categories.includes(x));
                if (intersection.length > 0) {
                    return true
                } else
                    return false
            }
        );
        const foundRestaurants = Suggestions.Locations[1].Restaurants.filter(r => {
            let intersection = r.Categories.filter(x => categories.includes(x));
            if (intersection.length > 0) {
                return true
            } else
                return false
        });
        foundAttractions = foundAttractions.concat(foundRestaurants)
        return foundAttractions
    }

    handleGemClick = (link) => {
        this.setState({blogVisible: true, link: link})
    }

    handleItemSelect = (name) => {
        const state = this.state;
        const suggestion = state.suggestions.find(s => s.name === name)
        suggestion.selected = !suggestion.selected;
        this.setState(state);
    }

    render() {
        const categories = this.state.categories;
        const {navigate} = this.props.navigation;
        const suggestions = this.state.suggestions
        const suggestedItems = suggestions.map((l) => {
            console.log("string    " + l.name)
            return (
                <SuggestedItem
                    location={l}
                    intersection={l.Categories.filter(x => categories.includes(x))}
                    handleItemSelect={this.handleItemSelect.bind(this)}
                    handleGemClick = {this.handleGemClick.bind(this)}
                />)
        })
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Based on your profile, you may enjoy these sites in Paris...</Text>
                <View style={styles.suggestionsContainer}>
                    <ScrollView>
                        {suggestedItems}
                    </ScrollView>
                </View>
                {/*<View>*/}
                {/*<Button*/}
                {/*title="Go to Itinerary"*/}
                {/*onPress={() => navigate('ItineraryScreen', {suggestions: this.state.suggestions.filter(s => s.selected)})}*/}
                {/*/>*/}
                {/*</View>*/}
                {this.state.blogVisible && <View style={styles.webContainer}>
                    <WebView
                        useWebKit={true}
                        source={{uri: this.state.link}}
                        style={styles.webView}
                    />
                    <TouchableWithoutFeedback title="close"
                                              onPress={() => {
                                                  this.setState({blogVisible: false})
                                              }}>
                        <View style={styles.closeBtn}>
                            <Text  style={styles.closeBtnText}>
                                Back to Suggestion List
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flex: 0,
        padding: 20,
        fontSize: 30,
        paddingBottom: 0
    },
    subHeader: {
        flex: 0,
        padding: 20,
        fontSize: 15,
    },
    suggestionsContainer: {
        marginTop: 20,
        flex: 1,
    },
    webView: {
        margin: 10,
    },
    webContainer: {
        height: 500,
        width: 400,
        borderRadius: 10,
        borderWidth: 5,
        position: 'absolute',
        alignSelf: 'center',
        top: 50,
        backgroundColor: '#fff'
    },
    closeBtn: {
        display: 'flex',
        backgroundColor: '#000',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeBtnText:{
        color: "#fff",
        fontSize: 20,
        textAlign: 'center'
    }
});