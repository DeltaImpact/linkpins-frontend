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
    const { data } = state;
    return {
        data
    };
}

const connectedMainPage = connect(mapStateToProps)(MainPage);
export { connectedMainPage as MainPage };