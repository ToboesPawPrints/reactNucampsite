import React from 'react'
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button,
Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

    class CommentForm extends React.Component {

        constructor(props) {
            super(props);
    
            this.state = {
              isModalOpen: false
            };

            this.toggleModal = this.toggleModal.bind(this);

        }

        handleSubmit(values) {
            this.toggleModal();
            this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
        }
    
    
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
            });
        }

        render() {
            return (
            <React.Fragment>
             <Button type="submit" outline onClick={this.toggleModal}>
                <i className="fa fa-pencil fa-lg" />
                  Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <Label htmlFor="rating" md={2}>Rating</Label>
                            <Control.select className="form-control" model=".rating">
                                
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Control.select>
                            <Label htmlFor="author" md={2}>Author</Label>
                            <Control.text className="form-control"  model=".author" id="author"
                            validators={{
                            minLength: minLength(2),
                            maxLength: maxLength(15),
                            }}>
                            </Control.text>
                            <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        component="div"
                        messages={{
                        required: 'Required',
                        minLength: 'Must be at 2 characters',
                         maxLength: 'Must be 15 characters or less',
                             }}
                             />
                            <Label htmlFor="text" md={2}>Text</Label>
                            <Control.textarea className="form-control"  model=".text">

                            </Control.textarea>
                            <Button type="submit">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
            )
        }
    }

    function RenderCampsite({campsite}) {
        return(
            <div className="col-md-5 m-1">
                  <Card>
                        <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
            </div>
        );
    }
    function RenderComments({comments, addComment, campsiteId}) {
        if (comments) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return (
                            <div>
                                <p>
                                    {comment.text}
                                </p>
                                <p>
                                  --  {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </div>
                        );
                    })}
                    <CommentForm campsiteId={campsiteId} addComment={addComment} />
                </div>
            );
        }
        return <div />
    }
    function CampsiteInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        if (props.campsite) {
            return (
                <div className="container">
                        <div className="row">
                    <div className="col">
                    <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
            </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                    </div>
                </div>
            );
        }
        return <div />;
    }
    
    export default CampsiteInfo;