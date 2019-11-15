import React from 'react'


class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: "",
            name: ""
        }
    }
    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }
    onNameChange = (event) => {
        this.setState({name : event.target.value})
    }
    
    onSubmitChange = (event) =>{
        event.preventDefault();
        fetch('http://localhost:3000/register', {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
                name: this.state.name
            }) 
        })
        .then(res => res.json())
        .then(user =>{
            if(user.id){
                this.props.onRouteChange('home')  
                this.props.loadUser(user);
                
            }
        })
    }


    render(){
        return(
            <article className="mw6 center shadow-5 bg- br3 pa3 pa4-ns mv3 ba b--black-10">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="name" 
                                name="name"  
                                id="name"
                                onChange = {this.onNameChange} 
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                 id="email-address"
                                 onChange = {this.onEmailChange}    
                                 />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password"
                                 name="password"  
                                id="password"
                                onChange = {this.onPasswordChange} 
                                 />
                            </div>
                        </fieldset>
                            <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
                            type="submit" 
                            onClick={this.onSubmitChange} 
                            value="Sign Up!"/>
                            </div>
                    </form>
                </main>
            </article>
        );
    }
     
}

export default Register;