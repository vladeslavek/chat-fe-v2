import {
    useState,
    useEffect,
    createContext,
    useContext
} from 'react';
import { loginUser, registerUser } from "../services/auth";
import axios from "axios";

const authContext = useContext({})
