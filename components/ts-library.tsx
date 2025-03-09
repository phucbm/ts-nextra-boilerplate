'use client';
import React from 'react';
import {createTsLibrary} from "@/src/_index";

const TsLibrary = () => {
    console.log('options');
    createTsLibrary({});
    return (
        <div>

        </div>
    );
};

export default TsLibrary;