import Link from 'next/link';
import type { GetServerSideProps, NextPage } from 'next'
import { wrapper } from '../../store';
import { fillProfile } from '../../store/slices/rootSlice';
import {connect, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { fillUser } from '../../store/slices/userSlice';
import { users } from '../../data';

const About: NextPage = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fillUser(users))
  },[])

    return(
        <div>
            <Link href="/">Home</Link>
            <Link href="/contact">contact</Link>
            <Link href="/terms">terms</Link>
        </div>
    )
}

export default About;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    try {      
        store.dispatch(fillProfile({name: 'Zahid',age:29}));
        return {
          props: null
        };
    } catch (err) {
      return {
        props:null
      };
    }
  });