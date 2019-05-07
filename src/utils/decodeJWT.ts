import jwt from "jsonwebtoken";
import User from "../entities/User";

// Promise를 리턴하되. 해당 토큰에 해당되는 id의 user가 존재하지 않으면 undefined 리턴
const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    const user = await User.findOne({ id });
    //     console.log(decoded);
    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
