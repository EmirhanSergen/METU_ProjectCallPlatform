import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  createApplication as apiCreateApplication,
  uploadAttachment as apiUploadAttachment,
  deleteAttachment as apiDeleteAttachment,
  updateApplication,
  getApplicationAttachments,
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
  attachments: Attachment[];
  mobilityEntries: MobilityEntry[];
  createApplication: () => Promise<boolean>;
  uploadAttachment: (file: File) => Promise<boolean>;
  deleteAttachment: (id: string) => Promise<boolean>;
  addMobilityEntry: (data: MobilityEntryInput) => Promise<boolean>;
  updateMobilityEntry: (id: string, data: MobilityEntryInput) => Promise<boolean>;
  removeMobilityEntry: (id: string) => Promise<boolean>;
  submitApplication: () => Promise<boolean>;
}

const ApplicationContext = createContext<ApplicationContextValue>({
  call: null,
  applicationId: null,
  attachments: [],
  mobilityEntries: [],
  createApplication: async () => false,
  uploadAttachment: async () => false,
  deleteAttachment: async () => false,
  addMobilityEntry: async () => false,
  updateMobilityEntry: async () => false,
  removeMobilityEntry: async () => false,
  submitApplication: async () => false,
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
      return;
    }
    localStorage.setItem(`applicationId_${callId}`, applicationId);
    const fetchAttachments = async () => {
      try {
        const data = await getApplicationAttachments(applicationId);
        setAttachments(data);
      } catch {
        setAttachments([]);
        show("Failed to load attachments");
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

    fetchAttachments();
    fetchMobility();
  }, [applicationId, callId, show]);

  const createApplication = async () => {
    if (applicationId) return true;
    try {
      const data = await apiCreateApplication(callId);
      setApplicationId(data.id as string);
      return true;
    } catch {
      show("Failed to create application");
      return false;
    }
  };

  const uploadAttachment = async (file: File) => {
    if (!applicationId) return false;
    try {
      const data = await apiUploadAttachment(applicationId, file);
      setAttachments((prev) => [...prev, data]);
      return true;
    } catch {
      show("Failed to upload file");
      return false;
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
        attachments,
        mobilityEntries,
        createApplication,
        uploadAttachment,
        deleteAttachment,
        addMobilityEntry,
        updateMobilityEntry,
        removeMobilityEntry,
        submitApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
