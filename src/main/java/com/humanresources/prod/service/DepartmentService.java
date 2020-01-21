package com.humanresources.prod.service;

import com.humanresources.prod.domain.Department;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Department}.
 */
public interface DepartmentService {

    /**
     * Save a department.
     *
     * @param department the entity to save.
     * @return the persisted entity.
     */
    Department save(Department department);

    /**
     * Get all the departments.
     *
     * @return the list of entities.
     */
    List<Department> findAll();


    /**
     * Get the "id" department.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Department> findOne(Long id);

    /**
     * Delete the "id" department.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the department corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @return the list of entities.
     */
    List<Department> search(String query);
}
