import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class MainPage extends React.Component {

    render() {
        const { user, data } = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col m8 offset-m2">
                        <h4 className="left-align">Pins</h4>

                        <ul className="collection">
                            <li className="collection-item avatar pin-content">
                                <div className="col m2">
                                    <i class="material-icons circle green">insert_chart</i>

                                </div>
                                <div className="col m10">
                                    <span className="title">Title</span>
                                    <p className="">First Line</p>
                                </div>
                                {/* <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a> */}
                            </li>

                            <li className="collection-item avatar pin-content">
                                <div className="col m2">
                                    <i class="material-icons circle green">insert_chart</i>

                                </div>
                                <div className="col m10">
                                    <span className="title">Title</span>
                                    <p className="">First Line</p>
                                </div>
                                {/* <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a> */}
                            </li>

                            <li className="collection-item avatar pin-content">
                                <div className="col m2">
                                    <i class="material-icons circle green">insert_chart</i>

                                </div>
                                <div className="col m10">
                                    <span className="title">Title</span>
                                    <p className="">First Line</p>
                                </div>
                                {/* <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a> */}
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
            // <div>
            //     something

            // </div>
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