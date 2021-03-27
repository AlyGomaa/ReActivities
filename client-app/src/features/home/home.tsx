import React from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'semantic-ui-react'

export default function HomePage() {
    return(
        <Container style={{marginTop: '4em'}}>
            <h2>Home Page <Link to='/activities'>Activities</Link></h2>
        </Container>
    )
}