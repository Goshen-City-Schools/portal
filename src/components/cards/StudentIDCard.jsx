import React from "react";

import { Flex, Text } from "@chakra-ui/react";

const StudentIDCard = ({ student }) => {
  return (
    <div
      className="m-4 rounded-xl border p-4 w-full max-w-[640px] mx-auto h-full max-h-[480px]"
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex gap-4 justify-between w-full">
        <div className="w-full  max-w-[60%] shrink-0">
          <div className="flex gap-1 items-center">
            <div className="h-16 w-16 overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src="/public/Goshen-logo-trans.png"
              />
            </div>

            <Flex
              direction={"column"}
              className="mt-1"
              justifyContent={"center"}
              display={"sticky"}
              top={0}
            >
              <Text
                as={"p"}
                className="text-lg p-0 text-black font-bold leading-tight"
              >
                GOSHEN GROUP OF SCHOOLS
              </Text>
              <Text
                as={"small"}
                className="text-sm  text-black font-bold uppercase"
              >
                Cre . Nur . Pri . Sec .
              </Text>
            </Flex>
          </div>

          <div className="flex flex-col">
            <div className="text-base w-full py-2 px-4 rounded-xl text-gray-100 my-2 bg-blue-900 font-bold mb-2">
              Student ID Card
            </div>

            <div className="flex flex-col p-2 text-sm gap-2">
              <div className="flex justify-between">
                <span className="text-purple-900 font-bold"> Name:</span>
                <span className="font-bold">
                  {student.first_name} {student.last_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-900 font-bold"> Gender:</span>
                <span className="font-bold">{student.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-900 font-bold"> Student ID:</span>
                <span className="font-bold">{student.studentId}</span>
              </div>
              <div className="flex justify-between">
                <div className="text-purple-900 font-bold">Class:</div>
                <span className="font-bold capitalize">
                  {student?.studentClass?.schoolClass.name}{" "}
                  {student?.studentClass?.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-[40%] p-4 shrink-0 justify-center">
          <div className="w-full h-full rounded-xl overflow-hidden">
            <img
              src="/avatar.png"
              alt="Student Avatar"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-900 px-4 mt-4 rounded-xl py-2 text-sm text-center text-white italic">
        Wisdom is a principal thing...
      </div>
    </div>
  );
};

export default StudentIDCard;
