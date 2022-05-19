package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.Section;

public interface SectionService {
	boolean saveSection(Section section);
	boolean updateSubledger(Section section);
	boolean deleteByIdSection(Long id);
	Section getByIdSection(Long id);
	List<Section> getAllSection();
}
