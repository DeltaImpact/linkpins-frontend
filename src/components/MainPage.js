import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class MainPage extends React.Component {
   
    render() {
        const { user, data } = this.props;
        return (
            <div>
                something

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { data, authentication } = state;
    const { user } = authentication;
    return {
        user,
        data
    };
}

const connectedMainPage = connect(mapStateToProps)(MainPage);
export { connectedMainPage as MainPage };