import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  createApplication as apiCreateApplication,
  uploadAttachment as apiUploadAttachment,
  uploadProposal as apiUploadProposal,
  uploadCV as apiUploadCV,
  deleteAttachment as apiDeleteAttachment,
  updateApplication,
  patchApplication,
  getApplication,
  getApplicationAttachments,
  patchApplication,
} from "../api/applications";
import {
  getMobilityEntries as apiGetMobilityEntries,
  createMobilityEntry as apiCreateMobilityEntry,
  updateMobilityEntry as apiUpdateMobilityEntry,
  deleteMobilityEntry as apiDeleteMobilityEntry,
} from "../api/mobilityEntries";
import { getCall } from "../api/calls";
import { Call } from "../types/global";
import { Attachment } from "../types/application";
import type { MobilityEntry, MobilityEntryInput } from "../types/mobility.types";
import { useToast } from "./ToastProvider";


interface ApplicationContextValue {
  call: Call | null;
  applicationId: string | null;
  application: Record<string, any>;
  attachments: Attachment[];
  mobilityEntries: MobilityEntry[];
  createApplication: () => Promise<string | null>;
  uploadAttachment: (file: File, field: string) => Promise<boolean>;
  uploadProposal: (file: File) => Promise<boolean>;
  uploadCV: (file: File) => Promise<boolean>;
  deleteAttachment: (id: string) => Promise<boolean>;
  addMobilityEntry: (data: MobilityEntryInput) => Promise<boolean>;
  updateMobilityEntry: (id: string, data: MobilityEntryInput) => Promise<boolean>;
  removeMobilityEntry: (id: string) => Promise<boolean>;
  submitApplication: () => Promise<boolean>;
  updateApplicationField: (field: string, value: unknown) => Promise<void>;
}

const ApplicationContext = createContext<ApplicationContextValue>({
  call: null,
  applicationId: null,
  application: {},
  attachments: [],
  mobilityEntries: [],
  createApplication: async () => null,
  uploadAttachment: async () => false,
  uploadProposal: async () => false,
  uploadCV: async () => false,
  deleteAttachment: async () => false,
  addMobilityEntry: async () => false,
  updateMobilityEntry: async () => false,
  removeMobilityEntry: async () => false,
  submitApplication: async () => false,
  updateApplicationField: async () => {},
});

export function useApplication() {
  return useContext(ApplicationContext);
}

export function ApplicationProvider({
  callId,
  children,
}: {
  callId: string;
  children: ReactNode;
}) {
  const [call, setCall] = useState<Call | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(() =>
    localStorage.getItem(`applicationId_${callId}`)
  );
  const [application, setApplication] = useState<Record<string, any>>({});
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [mobilityEntries, setMobilityEntries] = useState<MobilityEntry[]>([]);
  const { show } = useToast();

  useEffect(() => {
    if (!callId) return;
    const fetchCall = async () => {
      try {
        const data = await getCall(callId);
        setCall(data);
      } catch {
        show("Failed to load call");
      }
    };
    fetchCall();
  }, [callId, show]);

  useEffect(() => {
    if (!applicationId) {
      localStorage.removeItem(`applicationId_${callId}`);
      setAttachments([]);
      setApplication({});
      return;
    }
    localStorage.setItem(`applicationId_${callId}`, applicationId);
    const fetchData = async () => {
      try {
        const [app, files] = await Promise.all([
          getApplication(applicationId),
          getApplicationAttachments(applicationId),
        ]);
        setApplication(app);
        setAttachments(files);
      } catch {
        setApplication({});
        setAttachments([]);
        show("Failed to load application");
      }
    };
    const fetchMobility = async () => {
      try {
        const data = await apiGetMobilityEntries(applicationId);
        setMobilityEntries(data);
      } catch {
        setMobilityEntries([]);
        show("Failed to load mobility entries");
      }
    };

    fetchData();
    fetchMobility();
  }, [applicationId, callId, show]);

  const createApplication = async (): Promise<string | null> => {
    if (applicationId) return applicationId;
    try {
      const data = await apiCreateApplication(callId);
      setApplicationId(data.id as string);
      setApplication({ ...data, completed_steps: [] } as Record<string, any>);
      return data.id as string;
    } catch {
      show("Failed to create application");
      return null;
    }
  };

  const uploadAttachment = async (file: File, field: string) => {
    if (!applicationId) return false;
    try {
      const data = await apiUploadAttachment(applicationId, file, field);
      setAttachments((prev) => [...prev, data]);
      return true;
    } catch {
      show("Failed to upload file");
      return false;
    }
  };

  const uploadProposal = async (file: File) => {
    if (!applicationId) return false;
    try {
      const data = await apiUploadProposal(applicationId, file);
      setAttachments((prev) => [...prev, data]);
      return true;
    } catch {
      show("Failed to upload file");
      return false;
    }
  };

  const uploadCV = async (file: File) => {
    if (!applicationId) return false;
    try {
      const data = await apiUploadCV(applicationId, file);
      setAttachments((prev) => [...prev, data]);
      return true;
    } catch {
      return false;
    }
  };

  const updateApplicationField = async (field: string, value: unknown) => {
    if (!applicationId) return;
    setApplication((prev) => ({ ...prev, [field]: value }));
    try {
      await patchApplication(applicationId, { [field]: value });
    } catch {
      show("Failed to update application");
    }
  };

  const deleteAttachment = async (id: string) => {
    try {
      await apiDeleteAttachment(id);
      setAttachments((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch {
      show("Failed to delete file");
      return false;
    }
  };



const updateApplicationField = async (field: string, value: any) => {
  if (!applicationId) return false;
  try {
    await patchApplication(applicationId, { [field]: value });
    setApplication((prev) => ({ ...prev, [field]: value }));
    return true;
  } catch {
    show("Failed to save application");
    return false;
  }
};
  const addMobilityEntry = async (data: MobilityEntryInput) => {
    if (!applicationId) return false;
    try {
      const entry = await apiCreateMobilityEntry(applicationId, data);
      setMobilityEntries((prev) => [...prev, entry]);
      return true;
    } catch {
      show("Failed to add mobility entry");
      return false;
    }
  };

  const updateMobilityEntry = async (id: string, data: MobilityEntryInput) => {
    try {
      const entry = await apiUpdateMobilityEntry(id, data);
      setMobilityEntries((prev) => prev.map((e) => (e.id === id ? entry : e)));
      return true;
    } catch {
      show("Failed to update mobility entry");
      return false;
    }
  };

  const removeMobilityEntry = async (id: string) => {
    try {
      await apiDeleteMobilityEntry(id);
      setMobilityEntries((prev) => prev.filter((e) => e.id !== id));
      return true;
    } catch {
      show("Failed to delete mobility entry");
      return false;
    }
  };

  const submitApplication = async () => {
    if (!applicationId) return false;
    try {
      await updateApplication(applicationId, {
        call_id: callId,
        status: "SUBMITTED",
      });
      return true;
    } catch {
      show("Failed to submit application");
      return false;
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        call,
        applicationId,
        application,
        attachments,
        mobilityEntries,
        createApplication,
        uploadAttachment,
        uploadProposal,
        uploadCV,
        deleteAttachment,
        addMobilityEntry,
        updateMobilityEntry,
        removeMobilityEntry,
        submitApplication,
        updateApplicationField,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
