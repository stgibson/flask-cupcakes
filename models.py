from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """
        Connects app to the SQL database
        type app: Flask
    """
    db.app = app
    db.init_app(app)

class Cupcake(db.Model):
    """
        Defines cupcakes table in db with an id, a flavor, a size, a rating,
        and an image
    """
    __tablename__ = "cupcakes"

    default_image = "https://tinyurl.com/demo-cupcake"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    flavor = db.Column(db.Text, nullable=False)

    size = db.Column(db.Text, nullable=False)

    rating = db.Column(db.Float, nullable=False)

    image = db.Column(db.Text, nullable=False, default=default_image)

    def __repr__(self):
        """
            For showing data in instance
            rtype: str
        """
        return f"<Cupcake id={self.id} flavor={self.flavor} size={self.size} \
            rating={self.rating} image={self.image}>"

    def serialize(self):
        """
            Gets dict representation of instance
        """
        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self. image
        }