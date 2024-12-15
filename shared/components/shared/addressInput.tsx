'use client'

import React from 'react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
    onChange?: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token='172414ec669396e4ca0fcca8499a1bba1a68ef00'
            onChange={(data) => onChange?.(data?.value)}
        />
    )
}

