package com.robot.v1.core.model;

import java.sql.Blob;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(File.class)
public abstract class File_ {

	public static volatile SingularAttribute<File, Blob> file;
	public static volatile SingularAttribute<File, Historic> historic;
	public static volatile SingularAttribute<File, String> name;
	public static volatile SingularAttribute<File, Long> historicId;
	public static volatile SingularAttribute<File, Long> id;
	public static volatile SingularAttribute<File, String> type;

}

