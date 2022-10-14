import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wrapper } from '../../store';
import { fillProfile } from '../../store/slices/rootSlice';
import { fetchUsers } from '../../store/slices/userSlice';

const Contact: NextPage = () => {

  const dispatch = useDispatch()
  const count = useSelector((state) => state)

  useEffect(() => {
    dispatch(fillProfile({name: 'Emran',age:9}))
  },[])

    return(
        <div>
            <Link href="/">Home page</Link>
            <Link href="/contact">contact</Link>
            <Link href="/about">about</Link>
        </div>
    )
}

export default Contact;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    try {      
        await store.dispatch(fetchUsers());
        return {
          props: null
        };
    } catch (err) {
      return {
        props:null
      };
    }
  });