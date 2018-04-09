import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styled from 'styled-components';

import {
    WHITE
} from '../utils/constants';

const InputStyled = styled(TextInput) `
    padding-right: 5px;
    padding-left: 5px;
    padding-bottom: 2px;
    color: ${WHITE};
    fontSize: 18px;
    fontWeight: 200;
    flex: 1;
    height: 40px;
    width: 100%;
`

const Label = styled(Text) `
    fontSize: 14px;
    color: ${WHITE};
    fontWeight: 200;
    flex: 1;
    margin-bottom: 10px;
`

const Container = styled(View) `
    height: 45px;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    borderColor: ${WHITE};
    border-bottom-width: 1;
    margin-bottom: 20px;
`


const Input = ({ label, ...props }) => (
    <Container>
        <Label>{label.toUpperCase()}</Label>
        <InputStyled
            autoCorrect={false}
            underlineColorAndroid="rgba(0,0,0,0)"
            {...props}
        />
    </Container>
);

export default Input;
