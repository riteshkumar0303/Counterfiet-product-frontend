import Hero from "./Hero";
import { lazy, Suspense } from 'react';
import Loading from "../Loading";

const Companies = lazy(() => import('./Companies'));
const Guide = lazy(() => import('./Guide'));
const GetStarted = lazy(() => import('./GetStarted'));

const Team = lazy(() => import('./Team'));

const Home = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Hero />
            <Companies />
            <Guide />
            <GetStarted />
            <Team />
        </Suspense>
    );
}

export default Home;

