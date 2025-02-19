import React from 'react'
import clap from "../../../assets/images/clap.gif"
import { Link } from 'react-router-dom';
interface props {
  show : boolean;
}
const Congratulations = ({show} : props) => {
  return (
    <div className='Congratmodal'>
      <div className="modal" style={show ? {display : "block" } : {display : "none" }}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="fas fa-times"></i></button>
            </div> */}
            <div className="modal-body">
              <div className='conText'>
                <img src={clap} alt="" />
                <h4>Congratulation!!</h4>
                <h5>Thanks a bunch!!</h5>
                <p>We're thrilled to have you as a valued customer and<br /> can't wait to serve you again! 🎉<br />
                  <b> Keep an eye on your inbox – a confirmation email is<br /> on its way! 📧✨</b></p>
                {/* <Link to='/'>Back to Home</Link> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Congratulations
