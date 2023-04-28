import urls from "../../core/base.url";
import baseService from "../../core/baseServices";
import { StorageBox } from "../../core/storage";

export const is_course_completed = async (
  course_id: string,
  len_sec: number
): Promise<boolean> => {
  try {
    const allcompletesection: any = await baseService.get(
      urls.getAllCompletedSections +
        `/${StorageBox.retrieveUserData().user_id}/${course_id}`
    );

    const com_sec = allcompletesection.data?.payload?.length;
    const per = com_sec / len_sec;
    // console.log(com_sec)
    if (per < 1) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};
