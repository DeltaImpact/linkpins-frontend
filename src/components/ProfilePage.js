import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';
import './../styles/ProfilePage.css';

function NumberList(props) {
    const values = props.values;
    var listItems = Object.keys(values).map(function (value, index) {
        return <li key={index}>
            {value} : {values[value]}
        </li>

    })

    return (
        <ul className="user-list">
            {listItems}
        </ul>
    );
}

class ProfilePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.data_about_user());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }



    render() {
        const { user, data, auth } = this.props;
        // debugger
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Profile info</h2>
                {data.loading && <em>Loading profile...</em>}
                {data.error && <span className="text-danger">ERROR: {data.error}</span>}
                {data.items &&
                    // <NumberList values={data.items} />
                    <NumberList values={data.items} />
                    // <div>
                    //     {JSON.stringify(data.items)}
                    //     {/* { data.items.map(station => <div> {station} </div>) } */}
                    // </div>
                }

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { data, authentication, auth } = state;
    const { user } = authentication;
    return {
        user,
        data,
        auth
    };
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };