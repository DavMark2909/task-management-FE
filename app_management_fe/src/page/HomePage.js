import { useLoaderData, Await, defer, useRouteLoaderData } from "react-router-dom";
import Home from "../components/Home";
import { Suspense } from "react";

function HomePage(){

    // return <Home />;
    const {home} = useRouteLoaderData('root');
    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
          <Await resolve={home}>
            {(object) => <Home roles={object.roles} />}
          </Await>
        </Suspense>
      );
}

export default HomePage;
