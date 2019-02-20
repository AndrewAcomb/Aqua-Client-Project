import React from 'react';
import {Button, StyleSheet, Text, View,TouchableWithoutFeedback,ScrollView} from 'react-native';
import questions from '../questions.json';



export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: questions.questions,
            index: 0,
            finalIndex: 9,
            completed: false
        };
        this.handleOptionClick = this.handleOptionClick.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);

        // let options = state.questions.map(q => {q.options.map(o => o ={o: false})})

    }
    handleOptionClick = (o,q) => {
        const state= this.state 
        let option = state.questions.find(q2 =>q2.text === q.text).options.find(o2 => o2.name === o.name)
        option.status = !option.status
        this.setState(state)        

    }

    handleSubmitClick = () => {
        const {navigate} = this.props.navigation;
        const questions = this.state.questions
        const FilteredCategories = []
        for (var i = 0; i <questions.length; i++){
            let question =  questions[i]
            for (var j = 0; j < question.options.length; j++){
                let option = question.options[j]
                if (option.status){
                    for (var k = 0; k <option.Categories.length; k++){
                        if (!FilteredCategories.includes(option.Categories[k])){
                            FilteredCategories.push(option.Categories[k])
                        }
                    }
                }
            }   
        } 
        const index = this.state.index;
        if(index === this.state.finalIndex) {
            // navigate("SuggestionScreen", {state: this.state})
            navigate("SuggestionScreen", {categories: FilteredCategories})

            this.setState({completed: true})
        }
        else {
            this.setState({index: (index + 1)})
        }
    }

    render() {
        const questionItems = this.state.questions.map( q => {
            const questionOptions = q.options.map(o => {
                let buttonStyle
                let buttonTextStyle
                if (this.state.questions.find(q2 =>q2.text === q.text).options.find(o2 => o2.name === o.name).status){
                    buttonStyle = styles.buttonClicked
                    buttonTextStyle = styles.buttonClickedText
                }
                else{
                    buttonStyle = styles.button
                    buttonTextStyle = styles.buttonText
                }

                return(
                <TouchableWithoutFeedback title={o.name} 
                    onPress= {()=> {
                    this.handleOptionClick(o,q)}} >
                    <View style= {buttonStyle}>                    
                    <Text style={buttonTextStyle}>
                        {o.name}
                    </Text>
                    </View>
                </TouchableWithoutFeedback>
            )
            })
            return <View>
                <Text style={styles.questionText}> {q.text}</Text>
                <View style= {styles.optionContainer}>
                    {questionOptions}
                </View>
            </View>
        });
        if(!this.state.completed) {
            return (
                <View style={styles.container}>
                    <View style={styles.questionContainer}>
                    {questionItems[this.state.index]}
                    </View>
                    <TouchableWithoutFeedback title="Submit Button" onPress={this.handleSubmitClick}>
                        <View style={styles.submitButton}><Text style={styles.submitText}>Next</Text></View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }
        else{
            return (
                <ScrollView style={styles.container}>
                    <View style={styles.questionContainer}>
                        {questionItems}
                    </View>
                    <TouchableWithoutFeedback title="Submit Button" onPress={this.handleSubmitClick}>
                        <View style={styles.submitButton}><Text style={styles.submitText}>Next</Text></View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: "column",
        padding: 20,
    },
    questionContainer: {
        flex:0,
        paddingBottom: 70,
    },
    questionText: {
        fontSize: 30,
    },
    button: {
        width: 100,
        height: 100,
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor:  "#FF9A73",
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    buttonText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color:  "black"
    },

    optionContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'flex-start',
        flexWrap: "wrap",
    },
    buttonClicked: {
        color: "white",
        width: 100,
        height: 100,
        backgroundColor: "#FF9A73",
        margin: 10,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "#FF9A73",
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonClickedText: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15,
        color:"white"
    },
    submitButton: {
        width: 100,
        height: 40,
        borderRadius: 20,
        backgroundColor: "lightgrey",
        position: "absolute",
        right: 30,
        bottom: 50
    },
    submitText:{
        fontSize: 30,
        textAlign: "center"
    }
});