import { apiFetch } from "../lib/api";
import type { AcademicReferenceInput, AcademicReference } from "../types/academicReference.types";

export function createAcademicReference(data: AcademicReferenceInput) {
  return apiFetch(`/academic_references`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<AcademicReference>;
}

export function getAcademicReference(id: string) {
  return apiFetch(`/academic_references/${id}`) as Promise<AcademicReference>;
}

export function listAcademicReferences() {
  return apiFetch(`/academic_references`) as Promise<AcademicReference[]>;
}

export function updateAcademicReference(id: string, data: AcademicReferenceInput) {
  return apiFetch(`/academic_references/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }) as Promise<AcademicReference>;
}

export function deleteAcademicReference(id: string) {
  return apiFetch(`/academic_references/${id}`, { method: "DELETE" });
}
