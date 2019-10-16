import * as React from "react"
import { Icon } from 'semantic-ui-react';

export namespace Icons {
    export const isNotVegan = () => {
        return (
            <Icon.Group>
                <Icon name='dont' color='red' size='large' />
                {Icons.isVegan()}
            </Icon.Group>
        )
    }

    export const isVegan = () => {
        return (
            <Icon name='leaf' color='green' size='large' />
        )
    }

    export const isHomemade = () => {
        return (
            <Icon name='home' size='large' />
        )
    }

    export const isNotHomemade = () => {
        return (
            <Icon.Group>
                <Icon name='dont' color='red' size='large' />
                {Icons.isHomemade()}
            </Icon.Group>
        )
    }

    export const isAlcohol = () => {
        return (
            <Icon name='beer' size='large' />
        )
    }

    export const isNotAlcohol = () => {
        return (
            <Icon.Group>
                <Icon name='dont' color='red' size='large' />
                {Icons.isAlcohol()}
            </Icon.Group>
        )
    }
}