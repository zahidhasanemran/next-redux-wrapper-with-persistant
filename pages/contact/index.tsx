import Link from 'next/link';
import type { GetServerSideProps, NextPage } from 'next'
import { wrapper } from '../../store';
import { fillProfile } from '../../store/slices/rootSlice';
import {useDispatch, useSelector} from "react-redux"
import {useEffect} from "react"

const Contact: NextPage = () => {

  const dispatch = useDispatch()
  const count = useSelector((state) => state)

  useEffect(() => {
    dispatch(fillProfile({name: 'Emran',age:19}))
  },[])

    return(
        <div>
            <Link href="/">Home page</Link>
            <Link href="/terms">terms</Link>
        </div>
    )
}

export default Contact;

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async (context) => {
//     try {      
//         await store.dispatch(fillProfile({name: 'Zahid',age:29}));
//         return {
//           props: null
//         };
//     } catch (err) {
//       return {
//         props:null
//       };
//     }
//   });