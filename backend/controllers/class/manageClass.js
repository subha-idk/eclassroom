import Class from "../../models/Class.js";

const CREATE_CLASS = async (req, res) => {
  try {
    const { className, section, teacherId, classDate } = req.body;
     // Parse the date string into a JavaScript Date object
     const parsedDate = new Date(classDate);

     // Set the time to start of the day (00:00:00) in UTC timezone
    //  parsedDate.setUTCHours(0, 0, 0, 0);

    
 
 // Convert the date to ISOString in UTC timezone
//  const isoDate = parsedDate.toISOString();

 // Create a new class instance
 const newClass = new Class({
   className,
   section,
   teacherId,
   classDate: parsedDate // Store the modified date object
   // Add other relevant fields here if needed
 });

    // Save the new class to the database
    await newClass.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Class created successfully.",
      class: newClass,
    });
  } catch (error) {
    console.error("Error creating class:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const UPDATE_CLASS = async (req, res) => {
  try {
    const { classId } = req.params;
    const updateData = req.body;

  


    // Find the class by ID and update it in the database
    const updatedClass = await Class.findByIdAndUpdate(classId, updateData, {
      new: true,
    });

    // If class is not found, return a 404 error
    if (!updatedClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found." });
    }

    // Return success response with the updated class details as JSON
    res.status(200).json({ success: true, class: updatedClass });
  } catch (error) {
    console.error("Error updating class:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
const DELETE_CLASS = async (req, res) => {
  try {
    const { classId } = req.params;

    console;

    // Find the class by ID and delete it from the database
    const deletedClass = await Class.findByIdAndDelete(classId);

    // If class is not found, return a 404 error
    if (!deletedClass) {
      return res.json({ success: false, message: "Class not found." });
    }

    // Return success response
    res
      .status(200)
      .json({ success: true, message: "Class deleted successfully." });
  } catch (error) {
    console.error("Error deleting class:", error);
    // Return an error response if something goes wrong
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export { CREATE_CLASS, UPDATE_CLASS, DELETE_CLASS };
