import React, { useCallback, useEffect, useState } from 'react'
import { Container, Content, Header, QuestionsContent, AddQuestionsContent, AddAlternativeContent, Button } from './styles'
import TextField from "../../components/Textfield";
import { Form } from '@unform/web';
import { FiPlusCircle } from 'react-icons/fi'
import { useHistory } from 'react-router';
import { useRoom } from '../../hooks/room';

interface FormChallenge {
    title: string;
    timeToResponse: number;
    questions: Question[];
}

interface Question {
    question: string;
    alternatives: string[];
    correctAlternative: number;
}

const Constructor: React.FC = () => {
    const history = useHistory();
    const { sendCreate } = useRoom();
    const [formChallenge, setformChallenge] = useState<FormChallenge>({
        title: "About Earth",
        timeToResponse: 6,
        questions: [
            {
                question: "Which is the sky color?",
                correctAlternative: 2,
                alternatives: [
                    "Black",
                    "Purple",
                    "Blue",
                    "Yellow",
                ]
            },
            {
                question: "the Solar System pertence which galaxy?",
                correctAlternative: 3,
                alternatives: [
                    "Andromeda Galaxy",
                    "Cigar Galaxy",
                    "Backward Galaxy",
                    "the Milky Way Galaxy",
                ]
            },
        ],
    })

    useEffect(() => {}, [])

    const handleOnChange = useCallback(
        (event) => {
            const name = event.target.name;
            const value = event.target.value;
            setformChallenge({
                ...formChallenge,
                [name]: value,
            })
        },
        [formChallenge],
    );

    const handleOnChangeQuest = useCallback(
        (event) => {
            const index = event.target.name.split('-')[1];
            const value = event.target.value;
            const newQuestions = formChallenge.questions;
            newQuestions[index].question = value;
            setformChallenge({
                ...formChallenge,
                questions: newQuestions,
            })
        },
        [formChallenge],
    );

    const handleOnChangeAlternative = useCallback(
        (event) => {
            const indexQuest = event.target.name.split('-')[1];
            const indexAltern = event.target.name.split('-')[2];
            const value = event.target.value;
            const newQuestions = formChallenge.questions;

            newQuestions[indexQuest].alternatives[indexAltern] = value;
            setformChallenge({
                ...formChallenge,
                questions: newQuestions,
            })
        },
        [formChallenge],
    );

    const handleOnChangeCorrectAlternative = useCallback(
        (event) => {
            const indexQuest = event.target.name.split('-')[1];
            const value = event.target.value;
            const newQuestions = formChallenge.questions;

            newQuestions[indexQuest].correctAlternative = Number(value);
            setformChallenge({
                ...formChallenge,
                questions: newQuestions,
            })
        },
        [formChallenge],
    );

    const handleAddQuestion = useCallback(
        () => {
            const newQuestions = formChallenge.questions;
            newQuestions.push({
                alternatives: [],
                correctAlternative: 0,
                question: ""
            })
            setformChallenge({
                ...formChallenge,
                questions: newQuestions,
            })
        },
        [formChallenge],
    );

    const handleAddAlternative = useCallback(
        (indexQuestion) => {
            const newQuestions = formChallenge.questions;
            newQuestions[indexQuestion].alternatives.push("");
            setformChallenge({
                ...formChallenge,
                questions: newQuestions,
            })
        },
        [formChallenge],
    );

    const handleOnSubmit = useCallback(
        async (data) => {
            sendCreate(formChallenge);
            return history.push('/room')
        },
        [formChallenge],
    );

    return (
        <Container>
            <Header>
                <h1>Create a challenge</h1>
            </Header>
            <Content>
                <Form onSubmit={(data) => handleOnSubmit(data)}>
                    <div>
                        <span>What a title of challange?</span>
                        <TextField name="title" onChange={event => handleOnChange(event)} width="250" value={formChallenge.title} />
                    </div>
                    <div>
                        <span>How long to respond?</span>
                        <TextField name="timeToResponse" type="number" onChange={event => handleOnChange(event)} width="250" value={formChallenge.timeToResponse} />
                    </div>
                    <QuestionsContent>
                        {formChallenge.questions.map((question, indexQuest) => (
                            <div key={`quest-${indexQuest}`}>
                                <span>Ask the question</span>
                                <TextField
                                    name={`question-${indexQuest}`}
                                    onChange={event => handleOnChangeQuest(event)}
                                    width="250"
                                    value={formChallenge.questions[indexQuest].question}
                                />
                                <br />
                                {question.alternatives.map((alternative, indexAltern) => {
                                    let letter = ""
                                    switch (indexAltern) {
                                        case 0:
                                            letter = "a";
                                            break;
                                        case 1:
                                            letter = "b";
                                            break;
                                        case 2:
                                            letter = "c";
                                            break;
                                        case 3:
                                            letter = "d";
                                            break;
                                        case 4:
                                            letter = "e";
                                            break;
                                    }

                                    return (
                                        <section key={`altern-${indexQuest}-${indexAltern}`}>
                                            <span>
                                                {" " + letter + `) is this correct? `}
                                                <input
                                                    type="radio"
                                                    name={`altern-${indexQuest}`}
                                                    onChange={event => handleOnChangeCorrectAlternative(event)}
                                                    checked={question.correctAlternative == indexAltern}
                                                    value={indexAltern} />
                                                <TextField
                                                    name={`answer-${indexQuest}-${indexAltern}`}
                                                    width="40"
                                                    // placeholder={`Answer ${letter})`}
                                                    onChange={event => handleOnChangeAlternative(event)}
                                                    value={formChallenge.questions[indexQuest].alternatives[indexAltern]}

                                                />
                                            </span>
                                            <br />
                                        </section>
                                    )
                                }
                                )}
                                {question.alternatives.length < 5 ?
                                    <AddAlternativeContent onClick={() => handleAddAlternative(indexQuest)}>
                                        <FiPlusCircle />
                                    </AddAlternativeContent> :
                                    null}
                            </div>
                        ))}
                        <AddQuestionsContent onClick={() => handleAddQuestion()}>
                            <FiPlusCircle />
                        </AddQuestionsContent>
                    </QuestionsContent>
                    <Button type="submit">Send</Button>
                </Form>
            </Content>
        </Container>
    )
}

export default Constructor
