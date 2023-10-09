import React from 'react';
import SessionTerm from '../../components/forms/SessionTerm.form';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowCircleDown,
  FaChevronDown,
  FaChevronRight,
} from 'react-icons/fa';

export default function GenerateInvoicePage() {
  const navigate = useNavigate();

  return (
    <div className="paySection flex p-6 flex-col">
      <h3 className="font-bold text-2xl">Generate invoice</h3>

      <div className="flex flex-col mt-4 gap-4 w-full p-6 rounded-md shadow-md">
        <fieldset className="p-6 rounded-lg shadow-md w-full">
          <h4 className="font-bold text-xl text-blue-600  mb-6">
            Student details
          </h4>

          <form className="form grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="inputContainer">
              <label htmlFor="">First name:</label>
              <input type="text" />
            </div>
            <div className="inputContainer">
              <label htmlFor="">Last name:</label>
              <input type="text" />
            </div>
            <div className="inputContainer hidden">
              <label htmlFor="">Middle name:</label>
              <input type="text" />
            </div>
            <div className="inputContainer hidden">
              <label htmlFor="">Student ID:</label>
              <input type="text" />
            </div>
            <div className="inputContainer hidden">
              <label htmlFor="">Student Type:</label>
              <select name="" id="" disabled>
                <option value="">NEW STUDENT</option>
                <option value="">RETURNING STUDENT</option>
              </select>
            </div>
            <div className="inputContainer hidden">
              <label htmlFor="">Student Class:</label>
              <select name="" id="" disabled>
                <option value="">JSS 1A</option>
                <option value="">JSS 1B</option>
              </select>
            </div>
          </form>
        </fieldset>
        {/*  */}
        <fieldset className="p-6 rounded-lg shadow-md w-full">
          <h4 className="font-bold text-xl text-blue-600  mb-6">
            Parent/Guardian details
          </h4>

          <form className="form grid md:grid-cols-2  gap-3">
            <div className="inputContainer">
              <label htmlFor="">First name:</label>
              <input type="text" />
            </div>
            <div className="inputContainer hidden">
              <label htmlFor="">Last name:</label>
              <input type="text" />
            </div>
            <div className="inputContainer hidden">
              <label htmlFor="">Phone number:</label>
              <input type="text" />
            </div>
            <div className="inputContainer hidden">
              <label htmlFor="">Email:</label>
              <input type="email" name="" id="" />
            </div>
          </form>
        </fieldset>
        {/*  */}
        <fieldset className="p-6 rounded-lg shadow-md w-full">
          <h4 className="font-bold text-xl text-blue-600  mb-6">
            Academic Calendar
          </h4>

          <form className="form grid md:grid-cols-2  gap-3">
            <div className="inputContainer">
              <label htmlFor="">Session:</label>
              <select name="" id="" disabled="disabled">
                <option value="2023 - 2024">2023 - 2024</option>
              </select>
            </div>
            <div className="inputContainer">
              <label htmlFor="">Term:</label>
              <select name="" id="" disabled="disabled">
                <option value="term1">First Term</option>
              </select>
            </div>
          </form>
        </fieldset>

        {/*  */}
        <fieldset className="p-6 rounded-lg shadow-md w-full">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-xl text-blue-600  mb-6">
              Paying for?
            </h4>

            <span className="text-blue-700 p-2">
              <FaChevronDown size={20} />
            </span>
          </div>

          <div className="form grid md:grid-cols-2 gap-6">
            {/* School Fees  */}
            <div className="px-6 py-4 justify-between  rounded-md shadow-md">
              <div className="flex gap-4">
                <div className="illustration flex-shrink-0 relative h-24 w-24 rounded-md shadow-sm overflow-hidden">
                  <img
                    src="/school-tuition.jpeg"
                    alt="Goshen School Fees"
                    className="absolute w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold flex justify-between items-center text-gray-600">
                    School Tuition
                    <span>
                      <div className="h-4 w-4 mb-2 rounded-full flex justify-center items-center shadow-md  border border-gray-300 bg-orange-600"></div>
                    </span>
                  </h3>

                  <small className="line-clamp-2 text-justify">
                    These fees cover top-quality education, nurturing teachers,
                    and essential learning materials, ensuring your child's
                    early development is off to a great start.
                  </small>

                  <div className="flex justify-end">
                    <div className="h-7 w-7 mt-2 rounded-full flex justify-center items-center shadow-md bg-orange-700 text-gray-50">
                      <FaChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Boarding Fees */}
            <div className="px-6 py-4 justify-between  rounded-md shadow-md">
              <div className="flex gap-4">
                <div className="illustration flex-shrink-0 relative h-24 w-24 rounded-md shadow-sm overflow-hidden">
                  <img
                    src="/school-hostel.avif"
                    alt="Goshen School Fees"
                    className="absolute w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold flex justify-between items-center text-gray-600">
                    Boarding Fees
                    <span>
                      <div className="h-4 w-4 mb-2 rounded-full flex justify-center items-center shadow-md bg-gray-50 border border-orange-600"></div>
                    </span>
                  </h3>

                  <small className="line-clamp-2 text-justify">
                    Boarding Fees are applicable for students who reside in the
                    school's boarding facilities.
                  </small>

                  <div className="flex justify-end">
                    <div className="h-7 w-7 mt-2 rounded-full flex justify-center items-center shadow-md bg-orange-700 text-gray-50">
                      <FaChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bus Fees */}
            <div className="px-6 py-4 justify-between  rounded-md shadow-md">
              <div className="flex gap-4">
                <div className="illustration flex-shrink-0 relative h-24 w-24 rounded-md shadow-sm overflow-hidden">
                  <img
                    src="/school-transport.avif"
                    alt="Goshen School Fees"
                    className="absolute w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold flex justify-between items-center text-gray-600">
                    Bus Fees
                    <span>
                      <div className="h-4 w-4 mb-2 rounded-full flex justify-center items-center shadow-md bg-gray-50 border border-orange-600"></div>
                    </span>
                  </h3>

                  <small className="line-clamp-2 text-justify">
                    We provide safe and convenient transportation options for
                    students, ensuring they arrive at school comfortably and on
                    time.
                  </small>

                  <div className="flex justify-end">
                    <div className="h-7 w-7 mt-2 rounded-full flex justify-center items-center shadow-md bg-orange-700 text-gray-50">
                      <FaChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* School Books*/}
            <div className="px-6 py-4 justify-between  rounded-md shadow-md">
              <div className="flex gap-4">
                <div className="illustration flex-shrink-0 relative h-24 w-24 rounded-md shadow-sm overflow-hidden">
                  <img
                    src="/school-books.jpeg"
                    alt="Goshen School Fees"
                    className="absolute w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold flex justify-between items-center text-gray-600">
                    Books
                    <span>
                      <div className="h-4 w-4 mb-2 rounded-full flex justify-center items-center shadow-md bg-gray-50 border border-orange-600"></div>
                    </span>
                  </h3>

                  <small className="line-clamp-2 text-justify">
                    From captivating stories to educational resources, our books
                    open doors to new adventures and endless learning
                    opportunities.
                  </small>

                  <div className="flex justify-end">
                    <div className="h-7 w-7 rounded-full flex justify-center items-center shadow-md bg-orange-700 text-gray-50">
                      <FaChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* School Supplies  */}
            <div className="px-6 py-4 justify-between  rounded-md shadow-md">
              <div className="flex gap-4">
                <div className="illustration flex-shrink-0 relative h-24 w-24 rounded-md shadow-sm overflow-hidden">
                  <img
                    src="/school-supplies.jpeg"
                    alt="Goshen School Fees"
                    className="absolute w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold flex justify-between items-center text-gray-600">
                    School Supplies
                    <span>
                      <div className="h-4 w-4 mb-2 rounded-full flex justify-center items-center shadow-md bg-gray-50 border border-orange-600"></div>
                    </span>
                  </h3>

                  <small className="line-clamp-2 text-justify">
                    These fees cover top-quality education, nurturing teachers,
                    and essential learning materials, ensuring your child's
                    early development is off to a great start.
                  </small>

                  <div className="flex justify-end">
                    <div className="h-7 w-7 mt-2 rounded-full flex justify-center items-center shadow-md bg-orange-700 text-gray-50">
                      <FaChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* School Uniform */}
            <div className="px-6 py-4 justify-between  rounded-md shadow-md">
              <div className="flex gap-4">
                <div className="illustration flex-shrink-0 relative h-24 w-24 rounded-md shadow-sm overflow-hidden">
                  <img
                    src="/school-uniform.png"
                    alt="Goshen School Fees"
                    className="absolute w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold flex justify-between items-center text-gray-600">
                    Uniform
                    <span>
                      <div className="h-4 w-4 mb-2 rounded-full flex justify-center items-center shadow-md  border border-gray-300 bg-orange-600"></div>
                    </span>
                  </h3>

                  <small className="line-clamp-2 text-justify">
                    Your school uniform is more than just clothing; it's a badge
                    of honor that signifies you're part of our wonderful school
                    community.
                  </small>

                  <div className="flex justify-end">
                    <div className="h-7 w-7 mt-2 rounded-full flex justify-center items-center shadow-md bg-orange-700 text-gray-50">
                      <FaChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="totalCost w-max ml-auto px-6 pt-8 font-semibold"
            style={{ fontFamily: "'Domine', serif" }}
          >
            Total : <span className="text-xl">NGN 78,000</span>
          </div>
        </fieldset>

        {/*  */}
        <fieldset className="p-6 rounded-lg shadow-md w-full">
          <h4 className="font-bold text-xl text-blue-600  mb-6">
            Payment method
          </h4>

          <div className="form grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*  */}
            <div className="flex gap-1 items-center">
              <input type="checkbox" name="paymentMethod" id="paymentMethod" />
              Cash payment
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" name="paymentMethod" id="paymentMethod" />
              Bank Deposit
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" name="paymentMethod" id="paymentMethod" />
              Bank Transfer
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                name="paymentMethod"
                disabled
                id="paymentMethod"
              />
              Online Payment
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                name="paymentMethod"
                disabled
                id="paymentMethod"
              />
              Scholarship
            </div>
          </div>
        </fieldset>

        <div className="flex w-full flex-col gap-3  mt-6 justify-around text-sm ">
          <button
            type="submit"
            onClick={() => navigate('/fees/invoices/1')}
            className="bg-gray-50 border-2 rounded-lg text-green-700 border-green-800 font-bold py-2"
          >
            Generate invoice
          </button>
        </div>
      </div>
    </div>
  );
}
