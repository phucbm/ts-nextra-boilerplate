'use client';
import React from 'react';
import {Boilerplate} from "@/src/_index";

const BoilerplateComponent = () => {

    Boilerplate.create({debug:false});
    Boilerplate.create({debug:false});
    Boilerplate.create({debug:false});

    console.log(Boilerplate.getAll())

    Boilerplate.destroyAll()

    console.log(Boilerplate.getAll())

    return (
        <div>

        </div>
    );
};

export default BoilerplateComponent;