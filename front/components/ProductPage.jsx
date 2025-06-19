import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductPage() {
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const { isAdmin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}?category=${category}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("שגיאה בקבלת פרטי מוצר:", err);
        alert("המוצר לא נמצא");
        navigate(`/${category}`);
      });
  }, [id, category, navigate]);

  if (!product) return <div className="text-center py-5">טוען...</div>;

  return (
    <div className="container py-4" dir="rtl">
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← חזרה
        </button>
        {isAdmin && (
          <button
            className="btn btn-warning"
            onClick={() =>
              navigate(`/admin/edit/${product._id}?category=${category}`)
            }
          >
            עריכת מוצר
          </button>
        )}
      </div>

      <div className="row">
        <div className="col-md-5">
          <img
            src={product.image || `/images/${category}-default.jpg`}
            alt={product.name}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-7">
          <h2>{product.name}</h2>
          <p className="lead">{product.shortDescription}</p>
          <hr />
          <h5>תיאור מלא:</h5>
          <p>{product.fullDescription}</p>

          {product.mechanism?.length > 0 && (
            <>
              <h5>מנגנון פעולה:</h5>
              <ul>
                {product.mechanism.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {product.activeIngredients?.length > 0 && (
            <>
              <h5>רכיבים פעילים:</h5>
              <ul>
                {product.activeIngredients.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {product.instructions?.length > 0 && (
            <>
              <h5>המלצות שימוש:</h5>
              <ul>
                {product.instructions.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {product.suitableFor?.length > 0 && (
            <>
              <h5>למי זה מתאים:</h5>
              <ul>
                {product.suitableFor.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {product.sections?.length > 0 && (
            <>
              <h5>מידע נוסף:</h5>
              {product.sections.map((section, i) => (
                <div key={i} className="mb-3">
                  <h6 className="fw-bold">{section.title}</h6>
                  <ul>
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
