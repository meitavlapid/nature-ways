import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/UserContext";
import api from "../src/services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pencil, Trash, Plus, Info } from "react-bootstrap-icons";

const CATEGORY_LABELS = {
  acne: "מוצרים לטיפול באקנה",
  psoriasis: "מוצרים לטיפול בפסוריאזיס",
  pigmentation: "מוצרים לטיפול בפיגמנטציה",
  antiaging: "מוצרים לטיפול באנטי אייג'ינג",
  rehabilitation: "מוצרים לשיקום העור לאחר טיפולים",
  weightloss: "מוצרים לטיפול בירידה במשקל",
  hairloss: "מוצרים לטיפול בהתקרחות גברית",
  skinquality: "מוצרים לטיפול באיכות ומרקם האור",
};

function ProductListByCategory() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/api/products?category=${category}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("שגיאה בקבלת נתונים:", err.message));
  }, [category]);

  const handleEdit = (productId) => {
    navigate(`/admin/edit/${productId}?category=${category}`);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("האם את בטוחה שברצונך למחוק את המוצר?")) return;
    try {
      await api.delete(`/api/products/${productId}?category=${category}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error("שגיאה במחיקת מוצר:", err.message);
      alert("אירעה שגיאה בעת המחיקה");
    }
  };

  const title = CATEGORY_LABELS[category] || `מוצרים בקטגוריה: ${category}`;

  return (
    <div className="container py-4" dir="rtl">
      <h1 className="text-center mb-4">{title}</h1>

      {isAdmin && (
        <div className="text-end mb-4">
          <button
            className="btn btn-success"
            onClick={() => navigate(`/admin/add?category=${category}`)}
          >
            <Plus className="mb-1" /> הוספת מוצר חדש
          </button>
        </div>
      )}

      {products.length === 0 ? (
        <p className="text-center">לא נמצאו מוצרים בקטגוריה זו.</p>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-6 col-lg-4" key={product._id}>
              <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <img
                  src={product.image || `/images/${category}-default.jpg`}
                  className="card-img-top"
                  alt={product.name}
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center">{product.name}</h5>
                  <p className="card-text small text-muted text-center">
                    {product.shortDescription}
                  </p>

                  <div className="btn-container mt-auto d-flex justify-content-center">
                    <Link to={`/${category}/${product._id}`} className="btn">
                      לקרוא עלי עוד
                    </Link>

                    {isAdmin && (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(product._id)}
                        >
                          <Pencil className="mb-1" /> עריכה
                        </button>

                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash className="mb-1" /> מחיקה
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListByCategory;
