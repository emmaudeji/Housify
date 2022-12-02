from crypt import methods
import sys
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import setup_db, User, Property, WishList, Agent

db = SQLAlchemy()

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__)
    setup_db(app)

    """
    @TODO: Set up CORS. Allow '*' for origins.
    Delete the sample route after completing the TODOs
    """

    cors = CORS(app, resource={r"/api/*": {"origins": "*"}})

    """
    @TODO: Use the after_request decorator to set Access-Control-Allow
    """

    @app.after_request
    def after_request(response):
        response.headers.add('Access-Control-Allow-Headers',
                             'Content-Type, Authorization')
        response.headers.add('Access-Control-Allow-Methods',
                             'GET,PATCH,POST,PUT,DELETE,OPTIONS')
        response.headers.add('Content-Type', 'application/json')
        return response
        
    bcrypt = Bcrypt()

    # ROUTE
    @app.route('/')
    def hello():
        return 'hey'


    # create/register a user from form. Add bcrypt
    @app.route('/signup', methods=['POST'])
    def signup():
        error = False
        try:
            username = request.get_json()['username']
            email = request.get_json()['email']
            password = request.get_json()['password']
            hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
            user = User(
                username=username,
                email=email,
                password=hashed_pw
                )
            user.insert()
            body = user.format()
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'success': True,
            'user': body
        })

    # edit user details/profile
    @app.route('/edit_user/<user_id>', methods=['PUT'])
    def edit_user(user_id):
        error=False
        try:
            user = User.query.filter_by(id=user_id).first()
            user.username= request.get_json()['username']
            user.email = request.get_json()['email']
            password = request.get_json()['password']
            user.password = bcrypt.generate_password_hash(password).decode('utf-8')
            user.created_at = datetime.utcnow()
            user.update()
            body = user.format()
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'success': True,
            'user': body
        })

    # Login user route
    @app.route('/login', methods=['POST', 'GET'])
    def login():
        login_email = request.get_json()['email']
        login_password = request.get_json()['password']
        user = User.query.filter_by(email=login_email).first()
        if user and bcrypt.check_password_hash(user.password, login_password):
            return jsonify({
                "feedback": user.format(),
                "isLogin": True
            })
        return jsonify({
            "feedback": "Verify login details or sign-up.",
            "isLogin": False
        })

    # fetch all users
    @app.route('/users')
    def get_users():
        users = User.query.all()
        user_list = []
        for object in users:
            user_list.append(object.format())
        return jsonify({
            'users': user_list,
            'success': True
        })

    # ===============================================================
    # WISHLIST METHOD 1

    # create a wishlist
    @app.route('/create_wishlist/<user_id>', methods=['POST'])
    def create_wishlist(user_id):
        error = False
        try:
            user_id_exist = User.query.filter_by(id=user_id).first()
            if user_id_exist:
                wishlist = WishList(
                    address= request.get_json()['address'],
                    country= request.get_json()['country'],
                    property_type= request.get_json()['propertyType'],
                    bedroom= request.get_json()['bedroom'],
                    view1= request.get_json()['view1'],
                    view2= request.get_json()['view2'],
                    view3= request.get_json()['view3'],
                    view4= request.get_json()['view4'],
                    description= request.get_json()['description'],
                    price= request.get_json()['price'],
                    property_id= request.get_json()['propertyId'],
                    agent_id= request.get_json()['agentId'],
                    user_id= user_id,
                    created_at = datetime.utcnow()
                )
                wishlist.insert()
                body = wishlist.format()
            else:
                return "User does not exist. Register as User"
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'success': True,
            'feedback': body
        })

    # fetch wishlist by user_id
    @app.route('/wishlist/<user_id>/properties')
    def get_wishlist(user_id):
        error=False
        try:
            wishlist = WishList.query.filter_by(user_id=user_id).all()
            if wishlist:
                user = User.query.filter_by(id=user_id).first()
                wish_list = []
                for object in wishlist:
                    wish_list.append(object.format())
                body = jsonify({
                    'feedback': wish_list,
                    'user': user.username,
                    'success': True
                })
            else:
                print('user_id is not in wishlist')
                return jsonify({
                    'success': False,
                    'feedback': 'You have not saved any property on on your wishlist'
                    })
        except:
            error=True
            print(sys.exc_info())
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return body

    # delete a wishlist
    @app.route('/wishlist/<id>/deleted', methods=['DELETE'])
    def delete_wishlist(id):
        error = False
        try:
            wishlist = WishList.query.filter_by(id=id).first()
            body = wishlist.format()
            wishlist.delete()
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'success': True,
            'deleted': body
        })

    # ====================================
    # WISHLIST METHOD 2
    # create a wishlist
    @app.route('/create_wishlist/<property_id>', methods=['POST'])
    def create_wish_list(property_id):
        error = False
        try:
            property = Property.query.filter_by(id=property_id).first()
            property.user_id = request.get_json()['userId']
            property.update()
            body = property.format()
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.',
                
            })
        return jsonify({
            'feedback': body,
            'Success': True
        })
    
    # fetch all user's wishlist from property table
    @app.route('/wish_list/<user_id>')
    def get_wish_list(user_id):
        error = False
        try:
            wish_list = Property.query.filter_by(user_id=user_id).all()
            new_list = []
            for object in wish_list:
                new_list.append(object.format())
        except:
            error=True
           
            print(sys.exc_info())
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.',
                
            })
        return jsonify({
            'feedback': new_list,
            'success': True
        })

    # delete a wishlist from property
    @app.route('/wish_list/<property_id>/deleted', methods=['DELETE'])
    def delete_wish_list(property_id):
        error = False
        try:
            property = Property.query.filter_by(id=property_id).first()
            property.user_id = None
            property.update()
            userId = property.user_id
            propertyId = property.id
            body = property.format()
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'success': True,
            # 'feedback': f'removed property with id: ' + {propertyId} + ' from wishlist of user_id: ' + {userId},
            'body': body
        })

    # ===============================================================

    # fetch all agents
    @app.route('/agents')
    def get_agents():
        error=False
        try:
            users = Agent.query.all()
            agent_list = []
            for object in users:
                agent_list.append(object.format())
        except:
            error=True

            print(sys.exc_info())
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.',

            })
        return jsonify({
            'feedback': agent_list,
            'success': True
        })

    # create/register agent
    @app.route('/create_agent/<user_id>', methods=['POST'])
    def create_agent(user_id):
        error=False
        try:
            agent = Agent(
                fullname= request.get_json()['fullname'],
                address = request.get_json()['address'],
                country = request.get_json()['country'],
                phonenumber = request.get_json()['phonenumber'],
                linkedin = request.get_json()['linkedin'],
                profilePic = request.get_json()['profilePic'],
                email = request.get_json()['email'],
                bio = request.get_json()['bio'],
                twitter = request.get_json()['twitter'],
                created_at = datetime.utcnow(),
                user_id = user_id
            )
            agent.insert()
            body = agent.format()
            if body:
                user = User.query.filter_by(id=user_id).first()
                user.isAgent = True
                user.update()
                isAgent = True
        except:
            error=True

            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.',

            })
        return jsonify({
            'success': True,
            'agent': body,
            'isAgent': isAgent
        })

    # edit agent details/profile
    @app.route('/edit_agent/<agent_id>', methods=['PUT'])
    def edit_agent(agent_id):
        error=False
        try:
            agent = Agent.query.filter_by(id=agent_id).first()
            agent.fullname= request.get_json()['fullname']
            agent.address = request.get_json()['address']
            agent.country = request.get_json()['country']
            agent.phonenumber = request.get_json()['phonenumber']
            agent.linkedin = request.get_json()['linkedin']
            agent.profilePic = request.get_json()['profilePic']
            agent.email = request.get_json()['email']
            agent.created_at = datetime.utcnow()
            agent.update()
            body = agent.format()
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'success': True,
            'agent': body
        })

    # get agent by user_id
    @app.route('/agent/<user_id>')
    def get_agent(user_id):
        error=False
        try:
            agent = Agent.query.filter_by(user_id=user_id).first()
            if agent:
                agentdetails = agent.format()
            else:
                print('user_id is not in Agent list')
                return jsonify({
                    'success': False,
                    'feedback': 'You are not an agent.'
                    })
        except:
            error=True
            print(sys.exc_info())
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'feedback': agentdetails,
            'success': True
        })

# =======================================================

    # fetch all properties
    @app.route('/properties')
    def get_properties():
        error = False
        try:
            properties = Property.query.all()
            property_list = []
            for object in properties:
                property_list.append(object.format())
        except:
            error=True
            syserr: sys.exc_info()
            print(sys.exc_info())
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.',
                'systemError': syserr
            })
        return jsonify({
            'feedback': property_list,
            'success': True
        })

    # fetch properties by agent_id
    @app.route('/agent/<agent_id>/properties')
    def get_agent_properties(agent_id):
        error=False
        try:
            properties = Property.query.filter_by(agent_id=agent_id).all()
            if properties:
                agent = Agent.query.filter_by(id=agent_id).first()
                property_list = []
                for object in properties:
                    property_list.append(object.format())
                body = jsonify({
                    'feedback': property_list,
                    'agent': agent.fullname,
                    'success': True
                })
            else:
                print('agent_id is not in property list')
                return jsonify({
                    'success': False,
                    'feedback': 'You have not listed a property as an agent'
                    })
        except:
            error=True
            print(sys.exc_info())
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return body

    # create a property by agent_id
    @app.route('/property/<agent_id>', methods=['POST'])
    def create_property(agent_id):
        error = False
        try:
            agent_id_exist = Agent.query.filter_by(id=agent_id).first()
            if agent_id_exist:
                property = Property(
                    address= request.get_json()['address'],
                    country= request.get_json()['country'],
                    property_type= request.get_json()['propertyType'],
                    bedroom= request.get_json()['bedroom'],
                    view1= request.get_json()['view1'],
                    view2= request.get_json()['view2'],
                    view3= request.get_json()['view3'],
                    view4= request.get_json()['view4'],
                    description= request.get_json()['description'],
                    price= request.get_json()['price'],
                    agent_id= agent_id,
                    created_at = datetime.utcnow()
                )
                property.insert()
                body = property.format()
            else:
                return "Agent does not exist. Register as Agent"
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'success': True,
            'property': body
        })


    # edit listed property detail by property_id
    @app.route('/edit_property/<property_id>', methods=['PUT'])
    def edit_property(property_id):
        error=False
        try:
            property = Property.query.filter_by(id=property_id).first()
            property.address= request.get_json()['address']
            property.country= request.get_json()['country']
            property.property_type= request.get_json()['propertyType']
            property.bedroom= request.get_json()['bedroom']
            property.view1= request.get_json()['view1']
            property.view2= request.get_json()['view2']
            property.view3= request.get_json()['view3']
            property.view4= request.get_json()['view4']
            property.description= request.get_json()['description']
            property.price= request.get_json()['price']
            property.created_at = datetime.utcnow()
            property.update()
            body = property.format()
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'success': True,
            'user': body
        })
    
    # delete a property
    @app.route('/property/<property_id>/deleted', methods=['DELETE'])
    def delete_property(property_id):
        error = False
        try:
            property = Property.query.filter_by(id=property_id).first()
            body = property.format()
            property.delete()
        except:
            error=True
            print(sys.exc_info())
            db.session.rollback()
        finally:
            db.session.close()
        if error:
            return jsonify({
                'success': False,
                'feedback': 'Error occured, try again.'
            })
        return jsonify({
            'success': True,
            'feedback': body
        })

    return app
