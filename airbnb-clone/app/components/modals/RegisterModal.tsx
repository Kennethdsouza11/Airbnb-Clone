'use client';

import axios from 'axios'; //axios is used to make HTTPS requests from both the browser and Node.js 
import { AiFillGithub } from "react-icons/ai"; //icon for github
import { FcGoogle } from "react-icons/fc"; //icon for google
import { useCallback, useState } from 'react';
import {
    FieldValues, //represents the structure of the form's data
    SubmitHandler, //defines the type of function that will handle form submissions
    useForm //main hook from react hook form that helps to manage form states, like input validation and form submissions
} from 'react-hook-form';

import useRegisterModal from '../../hooks/useRegisterModal';


const RegisterModal = () => {
    return (
        <div></div>
    );
}

export default RegisterModal;