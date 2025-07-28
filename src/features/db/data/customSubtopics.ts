import { CustomSubtopic, ICustomSubtopic } from "@/features/db";

export const getCustomSubtopicsByUser = async (userId: string) => {
  return await CustomSubtopic.find({ createdBy: userId }).sort({ createdAt: -1 });
};

export const getCustomSubtopicsByParent = async (parentType: string, parentId: string) => {
  return await CustomSubtopic.find({
    'parentEntity.type': parentType,
    'parentEntity.id': parentId
  }).sort({ name: 1 });
};

export const getCustomSubtopicById = async (customSubtopicId: string) => {
  return await CustomSubtopic.findById(customSubtopicId);
};

export const createCustomSubtopic = async (customSubtopicData: Partial<ICustomSubtopic>) => {
  return await CustomSubtopic.create(customSubtopicData);
};

export const updateCustomSubtopic = async (customSubtopicId: string, updateData: Partial<ICustomSubtopic>) => {
  return await CustomSubtopic.findByIdAndUpdate(customSubtopicId, updateData, { new: true });
};

export const deleteCustomSubtopic = async (customSubtopicId: string) => {
  return await CustomSubtopic.findByIdAndDelete(customSubtopicId);
};

export const getCustomSubtopicWithCreator = async (customSubtopicId: string) => {
  return await CustomSubtopic.findById(customSubtopicId).populate('createdBy');
};

export const getCustomSubtopicTree = async (userId: string, parentType: string, parentId: string) => {
  const customSubtopics = await CustomSubtopic.find({
    createdBy: userId,
    'parentEntity.type': parentType,
    'parentEntity.id': parentId
  }).sort({ name: 1 });
  
  // Build tree structure
  const buildTree = (items: ICustomSubtopic[], parentId: string | null = null): ICustomSubtopic[] => {
    return items
      .filter((item: ICustomSubtopic) => item.parentSubtopic?.toString() === parentId)
      .map((item: ICustomSubtopic) => ({
        ...item.toObject(),
        children: buildTree(items, item._id.toString())
      }));
  };
  
  return buildTree(customSubtopics);
}; 